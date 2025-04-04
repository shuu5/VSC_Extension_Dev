# 環境構成

本DevContainer環境は、VSCode拡張機能開発に最適化された開発環境を提供します。

## 技術スタック

| コンポーネント | バージョン/説明 |
|--------------|----------------|
| ベースイメージ | Debian Bullseye |
| Node.js | 20.x (LTS) |
| TypeScript | グローバルインストール済み |
| Docker | Docker in Docker 対応 |
| VSCode 拡張機能 | ESLint, Prettier, TypeScript, Docker, JS Debugger |

## ディレクトリ構造

```
/
├── .devcontainer/            # DevContainer設定
│   └── devcontainer.json     # DevContainer構成ファイル
├── src/                      # ソースコード
│   ├── extension.ts          # 拡張機能のメインコード
│   └── test/                 # テストコード
├── Dockerfile                # 開発環境Dockerイメージ定義
├── docker-compose.yml        # Docker Compose設定
├── package.json              # プロジェクト設定とnpm依存関係
└── tsconfig.json             # TypeScript設定
```

## Dockerfile 詳細

Dockerfileでは以下のセットアップを行っています：

1. Debian Bullseyeをベースイメージとして使用
2. 開発に必要なツール（git, curl, wgetなど）のインストール
3. Node.js 20.x のインストール
4. TypeScript および拡張機能開発ツール（yo, generator-code, vsce）のインストール
5. Docker CLI のインストール（Docker in Docker に対応）
6. 一般ユーザー `vscode` の作成（権限問題を回避）

## Docker Compose 構成

docker-compose.yml は以下の構成を提供します：

1. Dockerfileからのイメージビルド
2. ホストのDockerソケットをマウント（Docker in Docker機能を実現）
3. 現在のディレクトリをコンテナの /workspace にマウント
4. コンテナの特権モードを有効化
5. ホストネットワークを使用
6. NODE_ENV=development 環境変数の設定

## devcontainer.json 詳細

VSCode Remote Containers 拡張機能向けの設定ファイルです。主な設定内容：

1. 使用するサービス名と作業ディレクトリの指定
2. エディタの設定（フォーマット、リンターなど）
3. 自動インストールするVSCode拡張機能
4. `npm install` の自動実行（コンテナ作成後）
5. ユーザー設定（root権限ではなく vscode ユーザーを使用）

## VSCode設定

コンテナ内では以下のVSCode設定が適用されます：

```json
{
  "terminal.integrated.defaultProfile.linux": "bash",
  "editor.formatOnSave": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 拡張機能

DevContainer内には以下のVSCode拡張機能が自動インストールされます：

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- TypeScript Next (ms-vscode.vscode-typescript-next)
- Docker (ms-azuretools.vscode-docker)
- JavaScript Debugger (ms-vscode.js-debug) 