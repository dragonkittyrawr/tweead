var twitter = {

    rantParse: [],
    rantCharCount: [],
    tweetCount: 0,
    charCount: 0,
    tweets: 0,
    count: 1,
    index: 0,
    rantCharCountLength: 0,
    ix: 0,

    tweetParser: function(rantRaw, rantParse, rantCharCount) {

        this.rantParse = rantParse;
        this.rantCharCount = rantCharCount;
        this.rantRaw = rantRaw;
        this.count = 1;
        this.ix = 0;

        // DETERMINE number of tweets

        console.log("tweetParser ===========================================");
        console.log("count " + this.count);
        console.log("tweetCount " + this.tweetCount);
        console.log("rantCharCount ", this.rantCharCount);
        console.log("rantCharCount length: " + rantCharCount.length);
        console.log("rantParse ", this.rantParse);
        console.log("charCount " + this.charCount);
        console.log("tweets " + this.tweets);
        console.log("========================================================");

        if (rantCharCount.length > 99) {
            tweetCount = Math.ceil(rantCharCount.length / 135);

            this.rantCharCountLength = 135;
            for (let i = 0; i < tweetCount; i++) {
                this.index = 0;
                tweets = i + 1;
                window["tweet" + tweets] = [];
                window["tweet" + tweets].push(tweets + "/" + tweetCount);
                twitter.tweetBuilder(this.rantCharCountLength);
            }
        } else if (rantCharCount.length < 99 && rantCharCount.length > 9) {
            tweetCount = Math.ceil(rantCharCount.length / 136);

            this.rantCharCountLength = 136;
            for (let i = 0; i < tweetCount; i++) {
                this.index = 0;
                tweets = i + 1;
                window["tweet" + tweets] = [];
                window["tweet" + tweets].push(tweets + "/" + tweetCount);
                twitter.tweetBuilder(this.rantCharCountLength);
            }
        } else {
            tweetCount = Math.ceil(rantCharCount.length / 137);

            this.rantCharCountLength = 137;
            for (let i = 0; i < tweetCount; i++) {
                this.index = 0;
                tweets = i + 1;
                window["tweet" + tweets] = [];
                window["tweet" + tweets].push(tweets + "/" + tweetCount);
                twitter.tweetBuilder(this.rantCharCountLength);
            }
        };
    },
    tweetBuilder: function(rantCharCountLength) {

        console.log("tweetBuilder ===========================================");
        console.log("count " + this.count);
        console.log("tweetCount " + this.tweetCount);
        console.log("rantCharCount ", this.rantCharCount);
        console.log("rantCharCount length: " + rantCharCount.length);
        console.log("rantParse ", this.rantParse);
        console.log("charCount " + this.charCount);
        console.log("tweets " + this.tweets);
        console.log("========================================================");

        this.rantCharCountLength = rantCharCountLength;

        // BUILD tweetCount        

        this.charCount += window["tweet" + tweets][0].length;

        // BUILD tweets

        while (this.charCount < this.rantCharCountLength && rantParse[this.ix] !== undefined) {

            this.charCount += rantParse[this.ix].length + 1;

            window["tweet" + this.count].splice(this.index, 0, this.rantParse[this.ix]);
            this.ix++;
            this.index++;
        };

        // RETURN tweets

        $("#parsedTweets").append("<div id=\"tweet" + this.count + "\" class=\"tweet\">" + window["tweet" + this.count].join(" ") + "</div>");

        this.count++;
        this.charCount = 0;
    }
};