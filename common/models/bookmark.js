module.exports = function (Bookmark) {
    Bookmark.observe('before save', function updateTimestamp(ctx, next) {
        if (ctx.instance) {
            ctx.instance.updated = new Date();
        } else {
            ctx.data.updated = new Date();
        }
        next();
    });

    Bookmark.beforeRemote('create', function (ctx, modelInstance, next) {
        // hack the accountId
        ctx.req.body.accountId = ctx.req.accessToken.userId;
        // question : what is modelInstance variable used for?
        next();
    });

    Bookmark.pub = function getPublic(page_index, cb) {
        let pageDataCount = 10;
        let pageIndex = page_index || 1;
        let skip = (pageIndex - 1) * pageDataCount;
        // todo: try to fetch data by Scope
        Bookmark.find({
            where: { isPublic: true },
            include: "account",
            skip: skip,
            limit: pageDataCount
        }, cb);
    }

    Bookmark.remoteMethod('pub', {
        accepts: { arg: 'page_index', type: 'number' },
        returns: { arg: 'data', type: 'array', root: true },
        http: { path: '/pub', verb: 'get' }
    });

    Bookmark.mine = function getMine(page_index, req, cb) {
        //todo: how to get current user
        let pageDataCount = 10;
        let pageIndex = page_index || 1;
        let skip = (pageIndex - 1) * pageDataCount;
        Bookmark.find({
            where: { accountId: req.accessToken.userId },
            skip: skip,
            limit: pageDataCount
        }, cb);
    }

    Bookmark.remoteMethod('mine', {
        accepts: [
            { arg: 'page_index', type: 'number' },
            { arg: 'req', type: 'object', http: { source: 'req' } }
        ],
        returns: { arg: 'data', type: 'array', root: true },
        http: { path: '/mine', verb: 'get' }
    });
};
