use std::sync::Arc;

use anyhow::{Context, Result};
use tokio::sync::RwLock;
use warp::Filter;

#[tokio::main]
async fn main() -> Result<()> {
    // create prisma client
    let client = prisma::new_client()
        .await
        .context("failed to create prisma client")?;

    // wrap client in thread-safe container, then warp
    let client = Arc::new(RwLock::new(client));
    let client = warp::any().map(move || client.clone());

    // return hello world
    let routes = warp::any().and(client).map(|_prisma| "Hello, World!");

    // serve
    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;

    Ok(())
}
