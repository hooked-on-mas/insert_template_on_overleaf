// エディタについての設定  
let editor = ace.edit("editor");
editor.setFontSize(14);

// デフォルトでテンプレートを設定．
let default_data = {
    fig : "\\begin{figure}[hbtp]\n\t\\centering\n\t\\includegraphics[keepaspectratio, width=8cm]{./}\n\t\\caption{}\n\t\\label{fig:}\n\\end{figure}",
    table: "\\begin{table}[hbtp]\n\t\\caption{}\n\t\\label{tbl:}\n\t\\centering\n\t\\begin{tabular}{ccc}\n\t\t\\hline\n\t\ta & b & c \\\\\n\t\t\\hline\\hline\n\t\t1 & 2 & 3 \\\\\n\t\t\\hline\n\t\\end{tabular}\n\\end{table}"
};
chrome.storage.local.set(default_data, function(){});


let id = document.getElementById('title_mode');
chrome.storage.local.get(null, ((data) => {
    for (let title in data){
        var element = document.createElement('option');
        element.setAttribute('value', title);
        element.innerHTML = title;
        id.appendChild( element );
    }
}));

let select = document.querySelector('[name="title_mode"]');
select.onchange = event => { 
    console.log(select.selectedIndex)
    if (select.selectedIndex == 0){
        $('#title_text').val('');
        editor.setValue('');
    } else {
        chrome.storage.local.get(select.value, function (value) {
            $('#title_text').val(select.value);
            editor.setValue(value[select.value]);
        });
    }
}

//保存ボタンが押されたとき
let new_data = {};
$('#save').on('click', function(){
    if ($('#title_text').val() == "") {
        alert('タイトルを入力してください．');
    } else if (editor.getValue() == "") {
        alert('挿入するコードを入力してください．');        
    } else {
    new_data[$('#title_text').val()] = editor.getValue();
    chrome.storage.local.set(new_data, function(){
        alert('保存が完了しました');
    });
    $('#title_text').val('');
    editor.setValue('');
    }
});
