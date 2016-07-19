function classNamesUtil(classes) {
    var activeClasses = [];
    for (var key in classes) {
        if (!!classes[key]) {
            activeClasses.push(key);
        }
    }
    return activeClasses.join(' ');
}

export default classNamesUtil