# 開発者ガイド

このドキュメントでは、VSCode拡張機能開発の基本的なガイドラインとアーキテクチャについて説明します。

## VSCode拡張機能のアーキテクチャ

VSCode拡張機能は、TypeScriptまたはJavaScriptで記述され、Node.jsランタイム上で実行されます。

### 基本構造

```
/
├── src/                      # ソースコード
│   ├── extension.ts          # エントリーポイント
│   ├── commands/             # コマンド実装
│   ├── providers/            # プロバイダー実装
│   └── test/                 # テストコード
├── package.json              # 拡張機能のマニフェスト
└── tsconfig.json             # TypeScript設定
```

### 主要コンポーネント

1. **アクティベーション**:
   - `extension.ts` の `activate()` 関数で拡張機能が起動時に実行するコードを定義
   - `package.json` の `activationEvents` でいつ拡張機能を読み込むかを指定

2. **コマンド**:
   - `vscode.commands.registerCommand` でコマンドを登録
   - `package.json` の `contributes.commands` でコマンドを宣言

3. **リソース管理**:
   - `context.subscriptions.push()` でリソースを登録し、拡張機能終了時に解放

## サンプル拡張機能の構造

本リポジトリのサンプル拡張機能は、Docker イメージをプルして DevContainer に接続するための機能を提供します。

### コンポーネント概要

- **アクティベーション**: extension.ts で拡張機能を初期化
- **コマンド**: `devcontainer-setup.setupContainer` コマンドを実装
- **UI操作**: 入力ボックスやプログレスバーを使用
- **ターミナル操作**: Docker コマンドの実行

### コードの説明

#### extension.ts

```typescript
// アクティベーション
export function activate(context: vscode.ExtensionContext) {
  // コマンドの登録
  let disposable = vscode.commands.registerCommand('devcontainer-setup.setupContainer', async () => {
    // コマンドの実装
    // ...
  });

  // リソース管理
  context.subscriptions.push(disposable);
}
```

#### package.json

```json
{
  // コマンドの宣言
  "contributes": {
    "commands": [
      {
        "command": "devcontainer-setup.setupContainer",
        "title": "DevContainer: Setup and Connect to Container"
      }
    ]
  }
}
```

## 開発ガイドライン

### コーディング規約

- TypeScriptの型システムを活用して型安全なコードを記述する
- Promiseベースの非同期処理を使用する
- ESLintとPrettierを使用してコードの品質を維持する

### エラー処理

```typescript
try {
  // 処理
} catch (error) {
  vscode.window.showErrorMessage(`エラーが発生しました: ${error}`);
}
```

### ユーザーインターフェース

- 情報メッセージ: `vscode.window.showInformationMessage`
- 警告メッセージ: `vscode.window.showWarningMessage`
- エラーメッセージ: `vscode.window.showErrorMessage`
- 入力ボックス: `vscode.window.showInputBox`
- クイックピック: `vscode.window.showQuickPick`
- プログレス表示: `vscode.window.withProgress`

### デバッグとテスト

1. **デバッグ**:
   - F5キーでデバッグセッションを開始
   - ブレークポイントを設定して実行を一時停止
   - 変数の値を確認

2. **テスト**:
   - `src/test` ディレクトリにテストを配置
   - `npm test` でテストを実行
   - Mochaフレームワークを使用したテスト

## 拡張機能のパッケージングと公開

### パッケージング

```bash
vsce package
```

これにより、.vsix ファイルが作成されます。

### Visual Studio Marketplace への公開

```bash
vsce publish
```

公開前に以下を確認してください：

1. `package.json` の情報が正確か
2. ライセンスファイルが存在するか
3. README.md が正しく記述されているか
4. アイコンなどの視覚的要素が含まれているか

## 参考リソース

- [VSCode 拡張機能 API](https://code.visualstudio.com/api)
- [VSCode 拡張機能サンプル](https://github.com/microsoft/vscode-extension-samples)
- [拡張機能ガイドライン](https://code.visualstudio.com/api/references/extension-guidelines)
- [vsce - 拡張機能管理ツール](https://github.com/microsoft/vscode-vsce) 