#!/bin/bash

# VSC Extension開発環境のセットアップスクリプト

# エラー発生時に停止
set -e

# ワークスペースディレクトリの作成
mkdir -p /home/vscode/project/extensions_src

# configディレクトリ（ワークスペース外）の作成
mkdir -p /home/vscode/config

# toolsディレクトリ（ワークスペース外）の作成
mkdir -p /home/vscode/tools

# 権限の設定 - 現在のユーザー情報を取得
current_user=$(whoami)
current_group=$(id -gn)

# 権限の設定
chown -R ${current_user}:${current_group} /home/vscode/project/extensions_src
chown -R ${current_user}:${current_group} /home/vscode/config
chown -R ${current_user}:${current_group} /home/vscode/tools

echo "=== 開発環境のセットアップが完了しました ==="
echo "ワークスペース: /home/vscode/project/extensions_src"
echo "設定ディレクトリ: /home/vscode/config"
echo "ツールディレクトリ: /home/vscode/tools" 