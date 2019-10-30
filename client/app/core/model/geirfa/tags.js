function tags(units = []) {

    const dict = {};

    for (let i = 0; i < units.length; i++) {
        
        const unit = units[i];
        
        for (let j = 0; j < unit.tags.length; j++) {
            
            const tag = unit.tags[j];

            if (tag === "" || tag === " ") { continue; }

            if (!dict[tag]) {
                dict[tag] = 1;
            } else {
                dict[tag] += 1;
            }

        }

    }

    return Object.keys(dict).sort();

}

export default tags;