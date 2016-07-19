function safeInvocateUtil(fn) {
    var remainingArgs = [].slice.call(arguments, 1);
    if (fn && typeof fn === 'function') {
        fn.apply(null, remainingArgs);
    }
}

export default safeInvocateUtil;