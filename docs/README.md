# VSCode 拡張機能開発用 DevContainer

このリポジトリは、VSCode 拡張機能開発用の DevContainer 環境を提供します。Docker コンテナを利用して、一貫した開発環境を簡単に構築できます。

## ドキュメント目次

- [環境構成](./environment.md) - DevContainer の構成と技術仕様について
- [使用方法](./usage.md) - DevContainer の起動方法から拡張機能開発の流れまで
- [開発者ガイド](./developer-guide.md) - 拡張機能のアーキテクチャと開発ガイドライン

## 概要

このDevContainer環境では以下の機能を提供します：

- TypeScript/Node.js ベースのVSCode拡張機能開発環境
- Docker in Docker のサポート (コンテナ内からDockerコマンドを実行可能)
- VSCode拡張機能開発に必要な各種ツールのプリインストール
- 拡張機能のビルド、テスト、デバッグ、パッケージングのサポート

## クイックスタート

1. VSCode に [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 拡張機能をインストール
2. このリポジトリをクローン
3. VSCode でリポジトリを開き、左下の緑色のアイコンをクリック
4. 「Remote-Containers: Reopen in Container」を選択
5. DevContainer の構築完了後、拡張機能の開発を開始

詳細な手順や追加情報は、各ドキュメントを参照してください。 