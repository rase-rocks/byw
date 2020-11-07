import text from "../../../core/text/data";
import supportedKeys from "../../../core/text/supported-keys";

export function getText(t) {
    return {
        show: t[supportedKeys.show],
        categorise: t[supportedKeys.categorise]
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