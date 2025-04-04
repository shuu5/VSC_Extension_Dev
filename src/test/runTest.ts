import * as path from 'path';
import * as cp from 'child_process';

import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // 拡張機能のルートディレクトリ
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // テストファイルのパス
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // VSCodeの統合テストを実行
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
    });
  } catch (err) {
    console.error('テストの実行中にエラーが発生しました:', err);
    process.exit(1);
  }
}

main(); 