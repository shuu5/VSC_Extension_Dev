# 使用方法

このドキュメントでは、VSCode拡張機能開発用DevContainerの使用方法を説明します。

## 前提条件

開発を始める前に、以下のソフトウェアがインストールされていることを確認してください：

- [VS Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Windows/Mac) または Docker Engine (Linux)
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VSCode拡張機能

## DevContainerの起動

1. VSCodeでプロジェクトフォルダを開きます。
2. VSCodeの左下にある緑色のアイコンをクリックします。
3. 表示されるメニューから「Remote-Containers: Reopen in Container」を選択します。
4. DevContainerのビルドと起動が完了するまで待ちます（初回は少し時間がかかります）。

## 新しい拡張機能プロジェクトの作成

DevContainer内で新しいVSCode拡張機能プロジェクトを作成するには：

```bash
# Yeomanとgenerator-codeは既にインストール済み
cd /workspace
yo code
```

プロンプトに従って拡張機能のタイプと設定を選択します。

## 既存の拡張機能プロジェクトの開発

本リポジトリには、Docker イメージをプルして DevContainer に接続する環境をセットアップする拡張機能のサンプルが含まれています。

### 拡張機能の実行

1. VSCodeでF5キーを押すか、デバッグパネルから「Run Extension」を選択します。
2. 新しいVSCodeウィンドウが開き、拡張機能がデバッグモードで実行されます。
3. コマンドパレット（Ctrl+Shift+P）を開き、「DevContainer: Setup and Connect to Container」を実行します。

### 拡張機能のビルド

```bash
npm run compile
```

### 拡張機能のテスト

```bash
npm run test
```

### 拡張機能のパッケージング

```bash
vsce package
```

これにより、配布可能な.vsix ファイルが作成されます。

## 外部拡張機能ソースの開発

ローカルに既にダウンロード済みの拡張機能ソースコードを使って開発したい場合は、`extensions_src` ディレクトリを利用できます。

### 外部拡張機能の配置

1. ローカルホスト上の `extensions_src` ディレクトリに既存の拡張機能ソースコードを配置します。
2. DevContainerを起動すると、このディレクトリは自動的にコンテナ内の `/workspace/extensions_src` にマウントされます。

### 外部拡張機能の開発

```bash
# コンテナ内で外部拡張機能のディレクトリに移動
cd /workspace/extensions_src/[拡張機能名]

# 依存関係のインストール
npm install

# 拡張機能のビルド
npm run compile

# 拡張機能のテスト実行
npm run test
```

### 複数の拡張機能の管理

複数の拡張機能を管理する場合は、以下のディレクトリ構造を推奨します：

```
extensions_src/
├── extension-a/  # 拡張機能Aのソースコード
├── extension-b/  # 拡張機能Bのソースコード
└── ...
```

各拡張機能のディレクトリ内で個別に開発作業を行います。

## Docker in Docker の利用

DevContainer内からDockerコマンドを実行できます：

```bash
# Dockerイメージのリスト表示
docker images

# コンテナの起動
docker run --rm -it node:14 node -v
```

## よくある問題と解決方法

### コンテナ起動時のエラー

- **問題**: 「Docker daemon is not running」というエラーが表示される
- **解決**: Docker Desktop（またはDockerサービス）が実行されていることを確認してください。

### アクセス権限の問題

- **問題**: ファイルの保存やコマンド実行で権限エラーが発生する
- **解決**: DevContainerは `vscode` ユーザーで実行されています。必要に応じて `sudo` を使用してください。

### 拡張機能がインストールされない

- **問題**: devcontainer.jsonで指定した拡張機能がインストールされない
- **解決**: コンテナを再ビルドするか、手動でVSCode拡張機能をインストールしてください。

## 応用例

### 別のNode.jsバージョンを使用する場合

Dockerfileを編集して、必要なNode.jsバージョンをインストールするよう変更できます：

```dockerfile
# Node.jsのインストール（別バージョン）
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest
```

変更後、コンテナを再ビルドする必要があります。

### 追加のツールをインストールする場合

Dockerfileに追加のツールをインストールするコマンドを追加できます：

```dockerfile
# 追加ツールのインストール
RUN apt-get update && apt-get install -y \
    mysql-client \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*
``` 