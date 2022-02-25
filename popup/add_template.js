// エディタについての設定  
let editor = ace.edit("editor");
editor.setFontSize(12);
// editor.getSession().setMode('ace/mode/latex');
// editor.getSession().setUseWrapMode(true);
// editor.getSession().setTabSize(4);
// editor.$blockScrolling = Infinity;

// デフォルトでテンプレートを設定．
let default_data = {
    fig : "\\begin{figure}[hbtp]\n\t\\centering\n\t\\includegraphics[keepaspectratio, width=8cm]{./}\n\t\\caption{}\n\t\\label{fig:}\n\\end{figure}",
    table: "\\begin{table}[hbtp]\n\t\\caption{}\n\t\\label{tbl:}\n\t\\centering\n\t\\begin{tabular}{ccc}\n\t\t\\hline\n\t\ta & b & c \\\\\n\t\t\\hline\\hline\n\t\t1 & 2 & 3 \\\\\n\t\t\\hline\n\t\\end{tabular}\n\\end{table}"
};
chrome.storage.local.set(default_data, function(){});

//保存ボタンが押されたとき
let new_data = {};
$('#save').on('click', function(){
    new_data[$('#title').val()] = editor.getValue();
    chrome.storage.local.set(new_data, function(){
        alert('保存が完了しました');
    });
});
