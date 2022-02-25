<<<<<<< Updated upstream
const script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = '$(window).keydown(function (e) {if (event.shiftKey && event.ctrlKey && e.keyCode == 13) {let comm = _ide.editorManager.$scope.editor.sharejs_doc.ace.getCopyText();if (comm == \'fig\') {_ide.editorManager.$scope.editor.sharejs_doc.ace.insert(\'\\\\' + 'begin{figure}[hbtp]\\n\t\\\\' + 'centering\\n\t\\\\' + 'includegraphics[keepaspectratio, width=8cm]{./}\\n\t\\\\' + 'caption{}\\n\t\\\\' + 'label{fig:}\\n\\\\' + 'end{figure}\');}else if(comm == \'tbl\'){_ide.editorManager.$scope.editor.sharejs_doc.ace.insert(\'\\\\' + 'begin{table}[hbtp]\\n\t\\\\' + 'caption{}\\n\t\\\\' + 'label{tbl:}\\n\t\\\\' + 'centering\\n\t\\\\' + 'begin{tabular}{ccc}\\n\t\t\\\\' + 'hline\\n\t\ta  & b  &  c  \\\\' + '\\\\' + '\\n\t\t\\\\' + 'hline\\\\' + 'hline\\n\t\t1  & 2  & 3 \\\\' + '\\\\' + '\\n\t\t\\\\' + 'hline\\n\t\\\\' + 'end{tabular}\\n\\\\' + 'end{table}\');}return false;}});';
(document.head || document.documentElement).appendChild(script);
=======
// コンテキストメニューが押された時，それを挿入する
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    chrome.storage.local.get(message, function (data) {
        insert_template_script(message, data[message])
    });
    sendResponse("done")
});

chrome.storage.local.get(null, ((data) => {
    for (let title in data){
        add_insert_template_script_shortcut(title, data[title])
    }
}));

function add_insert_template_script_shortcut(title, content) {    
    /*
        Function : 
            --- add a javascript code to insert a template to html when shift, ctrl and enter are hit

        Input
            - title   (String)
            - content (String)
        Output
            - script  (String)
    */
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = make_script_shortcut(title, content);
    (document.head || document.documentElement).appendChild(script);
}

function insert_template_script(title, content) {    
    /*
        Function : 
            --- add a javascript code to insert a template immediatel

        Input
            - title   (String)
            - content (String)
        Output
            - script  (String)
    */
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = make_script(title, content);
    (document.head || document.documentElement).appendChild(script);
}

function make_script_shortcut(title, content) {
    /*
        Function : make_script
            --- generate a javascript code to insert a template whose title is the arg "title" and content is the arg "content" when shift, ctrl and enter are hit

        Input
            - title   (String)
            - content (String)
        Output
            - script  (String)
    */
    const shortcut_key = 13;

    const key_eve = '$(window).keydown(function (e) {';
    const tri_con = 'if (event.shiftKey && event.ctrlKey && e.keyCode == ' + String(shortcut_key) + ') {';
    const get_com =     'let comm = _ide.editorManager.$scope.editor.sharejs_doc.ace.getCopyText();';
    const com_con =     'if (comm == \'' + title + '\') {';
    const ins_fun =         '_ide.editorManager.$scope.editor.sharejs_doc.ace.insert(';
    const con_bra =             '\'';
    const ins_end =     ');'
    const com_end =     '}return false;';
    const tri_end = '}';
    const key_end = '});';
    const script = key_eve + tri_con + get_com + com_con + ins_fun + con_bra + add_double_escape_sequence(content) + con_bra + ins_end + com_end + tri_end + key_end;
    return script
}

function make_script(title, content) {
    /*
        Function : make_script
            --- generate a javascript code to insert a template whose title is the arg "title" and content is the arg "content" immediately

        Input
            - title   (String)
            - content (String)
        Output
            - script  (String)
    */
    const shortcut_key = 13;

    const key_eve = '$(window).keydown(function (e) {';
    const tri_con = 'if (event.shiftKey && event.ctrlKey && e.keyCode == ' + String(shortcut_key) + ') {';
    const get_com =     'let comm = _ide.editorManager.$scope.editor.sharejs_doc.ace.getCopyText();';
    const com_con =     'if (comm == \'' + title + '\') {';
    const ins_fun =         '_ide.editorManager.$scope.editor.sharejs_doc.ace.insert(';
    const con_bra =             '\'';
    const ins_end =     ');'
    const com_end =     '}return false;';
    const tri_end = '}';
    const key_end = '});';
    const script = ins_fun + con_bra + add_double_escape_sequence(content) + con_bra + ins_end;
    return script
}

function add_double_escape_sequence(str) {
    return str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n');
}
>>>>>>> Stashed changes
