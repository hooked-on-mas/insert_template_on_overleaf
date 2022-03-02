// エディタについての設定  
let editor = ace.edit("editor");
editor.setFontSize(14);

// デフォルトでテンプレートを設定．
let default_data = {
    fig : "\\begin{figure}[hbtp]\n\t\\centering\n\t\\includegraphics[keepaspectratio, width=8cm]{./}\n\t\\caption{}\n\t\\label{fig:}\n\\end{figure}",
    table: "\\begin{table}[hbtp]\n\t\\caption{}\n\t\\label{tbl:}\n\t\\centering\n\t\\begin{tabular}{ccc}\n\t\t\\hline\n\t\ta & b & c \\\\\n\t\t\\hline\\hline\n\t\t1 & 2 & 3 \\\\\n\t\t\\hline\n\t\\end{tabular}\n\\end{table}"
};
chrome.storage.local.set(default_data, function(){});

// 既にあるコマンドを選択式メニューに追加
let id = document.getElementById('title_mode');
chrome.storage.local.get(null, ((data) => {
    for (let title in data){
        var element = document.createElement('option');
        element.setAttribute('value', title);
        element.innerHTML = title;
        id.appendChild( element );
    }
}));

// 選択されたメニューに対する挿入句を入れる
let select = document.querySelector('[name="title_mode"]');
select.onchange = event => { 
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

// 保存ボタンが押されたとき
$('#save').on('click', function(){

    let title = $('#title_text').val();
    let new_data = {};
    
    if (title == "") {
        alert('タイトルを入力してください．');

    } else if (editor.getValue() == "") {
        alert('挿入するコードを入力してください．');       

    } else {
        new_data[title] = editor.getValue();
        chrome.storage.local.set(new_data, function(){
        alert('保存が完了しました');
    });

    // background.js に新しいテンプレのコンテキストメニューを追加するための情報を提供
    chrome.runtime.sendMessage(title, function (mes){});

    // テキストボックスをリセット
    $('#title_text').val('');
    editor.setValue('');
    }
});

// 設定ボタンが押されたとき
let onoff = 0;
const settings_div = document.getElementById('settings');

$('#setting_button').on('click', function(){
    if (onoff == 0) {

        // コマンドを削除する設定
        let setting1 = document.createElement('h2');
        setting1.textContent = 'コマンドを削除';
        setting1.setAttribute("id", "delete");
        settings_div.appendChild(setting1);

        // コマンドの選択メニュー
        let set1_select = document.createElement('select');
        set1_select.setAttribute("id", "deleted_item");
        set1_select.setAttribute("name", "deleted_item");
        set1_select.setAttribute("class", "sel");
        chrome.storage.local.get(null, ((data) => {
            for (let title in data){
                var element = document.createElement('option');
                element.setAttribute('value', title);
                element.innerHTML = title;
                set1_select.appendChild( element );
            }
        }));
        settings_div.appendChild(set1_select);

        // 削除ボタン
        let set1_button = document.createElement('input');
        set1_button.id = "delete_button";
        set1_button.type = "button";
        set1_button.value = "削除";
        settings_div.appendChild(set1_button);
        

        // 削除ボタンが押されたとき
        $('#delete_button').on('click', function(){
            
            let deleted_item = document.getElementById("deleted_item");
            let selected_idx = deleted_item.selectedIndex;

            // chrome storage から削除
            chrome.storage.local.remove([deleted_item.options[selected_idx].value], function(msg){return true;});
            deleted_item.remove(selected_idx);
            $('#settings').empty()

        });

        onoff = 1;
    } else if (onoff == 1) {
        $('#settings').empty()
        onoff = 0;
    }
});
