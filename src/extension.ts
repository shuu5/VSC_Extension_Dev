import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('DevContainer Setup Extension is now active!');

  // コマンドの登録
  let disposable = vscode.commands.registerCommand('devcontainer-setup.setupContainer', async () => {
    // Docker イメージ名とタグの入力を求める
    const imageName = await vscode.window.showInputBox({
      placeHolder: 'e.g. node:16',
      prompt: 'Docker イメージ名を入力してください (例: image:tag)'
    });

    if (!imageName) {
      vscode.window.showErrorMessage('Docker イメージの指定が必要です');
      return;
    }

    try {
      // 進行状況を表示するステータスバー
      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Docker イメージ ${imageName} をプルしています...`,
        cancellable: true
      }, async (progress, token) => {
        progress.report({ increment: 0 });

        // ターミナルでdockerコマンドを実行
        const terminal = vscode.window.createTerminal('Docker Pull');
        terminal.show();
        terminal.sendText(`docker pull ${imageName}`);

        // イメージのプルが成功したと仮定して進捗を更新
        // 実際にはDockerのAPIを使用して状態を確認すべき
        await new Promise(resolve => setTimeout(resolve, 3000));
        progress.report({ increment: 50, message: 'DevContainer設定を準備中...' });

        // さらに処理（実際にはDevContainerへの接続設定など）
        await new Promise(resolve => setTimeout(resolve, 3000));
        progress.report({ increment: 50, message: '完了しました' });

        vscode.window.showInformationMessage(`Docker イメージ ${imageName} のセットアップが完了しました`);
        return Promise.resolve();
      });
    } catch (error) {
      vscode.window.showErrorMessage(`エラーが発生しました: ${error}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {} 