$(window).keydown(function (e) {
    if (event.shiftKey && event.ctrlKey && e.keyCode == 13) {
        let comm = _ide.editorManager.$scope.editor.sharejs_doc.ace.getCopyText();
        if (comm == 'fig') {
            let fig_content = '\begin{figure}[hbtp]\n\t\centering\n\t\includegraphics[keepaspectratio, width=8cm]{./}\n\t\caption{}\n\t\label{fig:}\n\end{figure}';
            _ide.editorManager.$scope.editor.sharejs_doc.ace.insert(fig_content);
        }
        return false;
    }
});