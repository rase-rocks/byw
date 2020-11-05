import text from "../../../core/text/data";
import supportedKeys from "../../../core/text/supported-keys";

export default function(props) {

    const content = text[props.language];
    const show = content[supportedKeys.show];
    const categorise = content[supportedKeys.categorise];

    return Object.assign({},
        props, 
        { 
            showLabelText: show, 
            categoriseLabelText: categorise
        });
        
}