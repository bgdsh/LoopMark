module.exports = function (Bookmark) {
    Bookmark.observe('before save', function updateTimestamp(ctx, next) {
        if (ctx.instance) {
            console.log(ctx.instance);
            ctx.instance.updated = new Date();
        } else {
            console.log(ctx.data);
            ctx.data.updated = new Date();
        }
        next();
    });

    Bookmark.public = function getPublic(page_index, cb) {
        let pageDataCount = 10;
        let pageIndex = page_index || 1;
        let skip = (pageIndex - 1) * pageDataCount;
        Bookmark.find({
            where: { isPublic: true },
            skip: skip,
            limit: pageDataCount
        }, cb);
    }

    Bookmark.remoteMethod('public', {
        accepts: { arg: 'page_index', type: 'number' },
        returns: { arg: 'data', type: 'array', root: true },
        http: { path: '/public', verb: 'get' }
    });

    Bookmark.mine = function getMine(page_index, cb) {
        //todo: how to get current user
        let pageDataCount = 10;
        let pageIndex = page_index || 1;
        let skip = (pageIndex - 1) * pageDataCount;
        Bookmark.find({
            where: { isPublic: true },
            skip: skip,
            limit: pageDataCount
        }, cb);
    }

    Bookmark.remoteMethod('mine', {
        accepts: { arg: 'page_index', type: 'number' },
        returns: { arg: 'data', type: 'array', root: true },
        http: { path: '/mine', verb: 'get' }
    });
};
