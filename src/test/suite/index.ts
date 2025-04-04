import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
  // テスト用モジュールを作成
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((resolve, reject) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return reject(err);
      }

      // すべてのテストファイルをテストスイートに追加
      files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // テスト実行
        mocha.run(failures => {
          if (failures > 0) {
            reject(new Error(`${failures} テストが失敗しました。`));
          } else {
            resolve();
          }
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
} 