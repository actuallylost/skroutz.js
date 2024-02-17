import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator("package", {
		description: "Creates a new package under the packages directory of the monorepo.",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "The name of the package.",
			},
			{
				type: "input",
				name: "description",
				message: "The description of the package.",
			},
		],
		actions: [
			{
				type: "add",
				path: `${plop.getDestBasePath()}/../../packages/{{name}}/src/index.ts`,
				template: 'console.log("Hello, World");',
			},
			{
				type: "add",
				path: `${plop.getDestBasePath()}/../../packages/{{name}}/tests/.gitkeep`,
			},
			{
				type: "add",
				path: `${plop.getDestBasePath()}/../../packages/{{name}}/.gitignore`,
				templateFile: "templates/template.gitignore",
			},
			{
				type: "add",
				path: `${plop.getDestBasePath()}/../../packages/{{name}}/LICENSE`,
				templateFile: "templates/LICENSE.template",
			},
			{
				type: "addMany",
				destination: `${plop.getDestBasePath()}/../{{name}}`,
				templateFiles: ["templates/*.hbs"],
				globOptions: { dot: true },
				stripExtensions: ["hbs"],
			},
		],
	});
}
