const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let page_action_disposable = vscode.commands.registerCommand('chrome-extension-helper.page_action', page_action);
	let browser_action_disposable = vscode.commands.registerCommand('chrome-extension-helper.browser_action',browser_action);

	context.subscriptions.push(page_action_disposable);
	context.subscriptions.push(browser_action_disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

const templates = require('./templates');

async function build_extension(type){
	var projectName = await vscode.window.showInputBox({"prompt":"Enter a name for your new project",
									  "placeHolder":"hello_world",});
	if (!projectName)	return vscode.window.showErrorMessage("Project name empty");
	const folder = await vscode.window.showOpenDialog({
		canSelectFolders: true,
		openLabel: "Select a folder to create the project in"
	});
	if (!folder || folder.length !== 1)	return;
	const folderName = folder[0]["path"];
	const fullpath = path.join(folderName,projectName);
	if (fs.existsSync(fullpath))
		return vscode.window.showErrorMessage("A folder named "+projectName+" already exists");

	fs.mkdirSync(fullpath);
	createManifest(fullpath,projectName,type);
	createPopupHtml(fullpath,projectName);
	createEmptyFiles(fullpath);
	const S = !(!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length);
	await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(fullpath),S);
	
}

async function page_action(){
	build_extension("page_action");
}

function browser_action(){
	build_extension("browser_action");
}

function createManifest(fullpath,projectName,type){
	var manifest = templates.getManifest(projectName,type);
	fs.writeFileSync(path.join(fullpath, "manifest.json"), manifest);
}

function createPopupHtml(fullpath,projectName){
	var popup = templates.getPopup(projectName);
	fs.writeFileSync(path.join(fullpath, "popup.html"),popup);
}
function createEmptyFiles(fullpath){
	const js = path.join(fullpath,"js");
	const img = path.join(fullpath,"img");
	fs.mkdirSync(js);
	fs.mkdirSync(img);
	fs.writeFileSync(path.join(js, "popup.js"),"");
	fs.writeFileSync(path.join(js, "eventPage.js"),"");
	fs.writeFileSync(path.join(fullpath, "options.html"),"");
}