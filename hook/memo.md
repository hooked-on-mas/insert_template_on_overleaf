## 実装メモ

Content Scriptとかだと，aceでの変数を使えなさそうなので，直接sciptを挿入するしかなさそうなので，そうした（Writefulはそうしてた）．
_ide.editorManager.$scope.editor.sharejs_doc.ace までがACEのeditorの部分に相当しそう．
emmetのように文字選択委せずにできる方法も考えたけれど難しそう．選択せずに位置から文字を取得する関数が見つからなかった．選択してやっとできた．

### 文字の挿入
_ide.editorManager.$scope.editor.sharejs_doc.ace.insert("aa\na");

### cursorのオブジェクト
_ide.editorManager.$scope.editor.sharejs_doc.ace.selection.cursor

### cursorの位置
_ide.editorManager.$scope.editor.sharejs_doc.ace.selection.getCursorPosition() 

### 行頭に異動
_ide.editorManager.$scope.editor.sharejs_doc.ace.moveCursorTo(_ide.editorManager.$scope.editor.sharejs_doc.ace.selection.cursor.row, 0)

### shift enter
```
$(window).keydown(function (e) {
    if (event.shiftKey) {
        if (e.keyCode == 13) {
            alert("Shift + Enter");
            return false;
        }
    }        
});
```

### 注意

以下のように変換する．挿入する内容だけでなく，javascript全体（comm == 'fig'の部分も）なので注意．
- " -> \"
- \ -> \\\\
    例えば aaa\beginaaa -> "aaa\\\\beginaaa"
- \\ -> \\\\\\\\
- 改行 -> \\n
- タブ -> \t

### 改行とタブを無くす
https://html-css-javascript.com/n-space-tab/