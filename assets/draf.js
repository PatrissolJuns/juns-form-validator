function jfvGetData() {
    return Array.prototype
        .slice
        .call(document.getElementById("nom").attributes)
        .map(item => ({ [item.name]: item.value})
        );
}