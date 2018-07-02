import React from "react";

class THead extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <td>
                        Type
                    </td>
                    <td>
                        Download link
                    </td>
                    <td>
                        SHA256 Hash
                    </td>
                </tr>
            </thead>
        );
    }
}

export default THead;