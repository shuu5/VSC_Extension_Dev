FROM debian:bullseye

# 必要なツールとNode.jsのインストール
RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg \
    lsb-release \
    apt-transport-https \
    ca-certificates \
    software-properties-common \
    wget \
    build-essential \
    sudo \
    # 開発に必要な最低限のライブラリ
    libnss3 \
    --no-install-recommends \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && npm install -g typescript @types/node yo generator-code vsce \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの設定
WORKDIR /workspace

# ユーザ設定
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# 新しいユーザを作成し、sudoグループに追加
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# デフォルトユーザをvscodeに設定
USER $USERNAME 

# コンテナが終了しないように常駐プロセスを追加
CMD ["tail", "-f", "/dev/null"] 