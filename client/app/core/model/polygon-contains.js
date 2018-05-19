
export default function isInside(point, polyPoints) {     
    
    const x = point[1];
    const y = point[0];

    let inside = false;
    for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {

        const xi = polyPoints[i][1];
        const yi = polyPoints[i][0];
        const xj = polyPoints[j][1];
        const yj = polyPoints[j][0];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;

}
