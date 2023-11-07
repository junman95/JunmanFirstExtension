import axios from "axios";
import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  const res = await axios.get("https://picsum.photos/v2/list");

  const images = res.data.map((item: any) => {
    return {
      label: item.author,
      detail: item.url,
      link: item.download_url,
    };
  });

  let disposable = vscode.commands.registerCommand(
    "JunmanFirstExtension.whatIsMyName",
    () => {
      vscode.window
        .showInputBox({
          placeHolder: "Enter your name",
        })
        .then((value) => {
          vscode.window.showInformationMessage(`Your name is ${value}`);
        });
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "JunmanFirstExtension.showImage",
    async () => {
      await vscode.window
        .showQuickPick(images, {
          matchOnDetail: true,
        })
        .then((article) => {
          // TODO: Deprecated 되었는데 어떻게 바꿔야할까
          article &&
            vscode.env.openExternal(article.link as unknown as vscode.Uri);
        });
    }
  );

  context.subscriptions.push(disposable, disposable2);
}

export function deactivate() {}
