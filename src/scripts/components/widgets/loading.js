/**
* @description：
* @author: manble@live.com
* @created: 2017-12-23
*/

'use strict';

export default ({ isLoading, error }) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }

    return null;
};