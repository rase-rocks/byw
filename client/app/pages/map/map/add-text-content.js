import text from "../../../core/text/data";
import k from "../../../core/text/supported-keys";

export function getText(t) {
    return {
        show:       t[k.show],
        categorise: t[k.categorise]
    };
}

export default function(props) {

    const content = text[props.language];
    const { show, categorise } = getText(content);

    return Object.assign({},
        props, 
        { 
            showLabelText: show, 
            categoriseLabelText: categorise
        });
        
}