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
    Bookmark.pubilc=function getPublicBookmarks(page_index,cb) {
        let pageDataCount=10;
        let pageIndex= page_index || 1;
        let skip = (pageIndex-1)*pageDataCount;
        Bookmark.find({
            where:{isPublic:true},
            skip:skip,
            limit:pageDataCoun
        },cb);
    }
    Bookmark.remoteMethod('public',{
        accepts:{arg:'page_index',type:'number'},
        returns: {type:'array',root:'true'}
    });
};
