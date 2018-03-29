describe('Article module', function () {
    beforeEach(module("articleApp"));
    describe('Check service', function () {
        var articlesService, $q, $rootScope, $httpBackend;
        beforeEach(inject(function (_$q_, _$rootScope_, _$httpBackend_, _articlesService_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $httpBackend.whenRoute('GET', '/list-articles.json')
                .respond(function (method, url, data, headers, params) {
                    return [200, { articles: ['test'] }];
                });
            articlesService = _articlesService_;
        }));
        afterEach(function () {
            //These two calls will make sure that at the end of the test, all expected http calls were made
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('Service should be defined and get result', inject(function ($injector, _$q_) {
            expect(articlesService.articles).toBeUndefined();
            $httpBackend.flush();
            expect(articlesService.articles).toEqual(['test']);
        }))
    })
});