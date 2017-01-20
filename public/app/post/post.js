"use strict";
var Post = (function () {
    function Post(_id, title, body, _author) {
        this._id = _id;
        this.title = title;
        this.body = body;
        this._author = _author;
    }
    return Post;
}());
exports.Post = Post;

//# sourceMappingURL=post.js.map
