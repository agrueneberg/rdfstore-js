var QueryEngine = require("./../src/query_engine").QueryEngine;
var QuadBackend = require("./../../js-rdf-persistence/src/quad_backend").QuadBackend;
var Lexicon = require("./../../js-rdf-persistence/src/lexicon").Lexicon;

exports.testBasePrefix1 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX ns: <http://example.org/ns#>  PREFIX x:  <http://example.org/x/> PREFIX z:  <http://example.org/x/#> INSERT DATA { x:x ns:p  "d:x ns:p" . x:x x:p   "x:x x:p" . z:x z:p   "z:x z:p" . }', function(success, result){

                engine.execute('BASE <http://example.org/x/> PREFIX : <> SELECT * WHERE { :x ?p ?v }', function(success, results){
                    test.ok(success === true);
                    test.ok(results.length === 2);
                    
                    for(var i=0; i< results.length; i++) {
                        var result = results[i];
                        if(result.p.value === "http://example.org/ns#p") {
                            result.v.value === "d:x ns:p";
                        } else if(result.p.value === "http://example.org/x/p") {
                            result.v.value === "x:x x:p";
                        } else {
                            result.ok(false);
                        }
                    }
                    test.done();
                });
            });
        });
    });
};


exports.testBasePrefix2 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX ns: <http://example.org/ns#>  PREFIX x:  <http://example.org/x/> PREFIX z:  <http://example.org/x/#> INSERT DATA { x:x ns:p  "d:x ns:p" . x:x x:p   "x:x x:p" . z:x z:p   "z:x z:p" . }', function(success, result){

                engine.execute('BASE <http://example.org/x/> PREFIX : <#> SELECT * WHERE { :x ?p ?v }', function(success, results){
                    test.ok(success === true);
                    test.ok(results.length === 1);
                    
                    test.ok(results[0].v.value === "z:x z:p");
                    test.ok(results[0].p.value === "http://example.org/x/#p");
                    test.done();
                });
            });
        });
    });
};

exports.testBasePrefix3 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX ns: <http://example.org/ns#>  PREFIX x:  <http://example.org/x/> PREFIX z:  <http://example.org/x/#> INSERT DATA { x:x ns:p  "d:x ns:p" . x:x x:p   "x:x x:p" . z:x z:p   "z:x z:p" . }', function(success, result){

                engine.execute('PREFIX ns: <http://example.org/ns#> PREFIX x:  <http://example.org/x/> SELECT * WHERE { x:x ns:p ?v }', function(success, results){
                    test.ok(success === true);
                    test.ok(results.length === 1);
                    
                    test.ok(results[0].v.value === "d:x ns:p");
                    test.done();
                });
            });
        });
    });
};

exports.testBasePrefix4 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX ns: <http://example.org/ns#>  PREFIX x:  <http://example.org/x/> PREFIX z:  <http://example.org/x/#> INSERT DATA { x:x ns:p  "d:x ns:p" . x:x x:p   "x:x x:p" . z:x z:p   "z:x z:p" . }', function(success, result){

                engine.execute('BASE <http://example.org/x/> SELECT * WHERE { <x> <p> ?v }', function(success, results){
                    test.ok(success === true);
                    test.ok(results.length === 1);
                    
                    test.ok(results[0].v.value === "x:x x:p");
                    test.done();
                });
            });
        });
    });
};


exports.testBasePrefix5 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX ns: <http://example.org/ns#>  PREFIX x:  <http://example.org/x/> PREFIX z:  <http://example.org/x/#> INSERT DATA { x:x ns:p  "d:x ns:p" . x:x x:p   "x:x x:p" . z:x z:p   "z:x z:p" . }', function(success, result){

                engine.execute('BASE <http://example.org/x/> SELECT * WHERE { <#x> <#p> ?v }', function(success, results){
                    test.ok(success === true);
                    test.ok(results.length === 1);
                    
                    test.ok(results[0].v.value === "z:x z:p");
                    test.done();
                });
            });
        });
    });
};

exports.testList1 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX : <http://example.org/ns#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> INSERT DATA { :x :list0 () . :x :list1 ("1"^^xsd:integer) . :x :list2 ("11"^^xsd:integer "22"^^xsd:integer) . :x :list3 ("111"^^xsd:integer "222"^^xsd:integer "333"^^xsd:integer) .}', function(success, result){

                engine.execute('PREFIX : <http://example.org/ns#>\
                                SELECT ?p\
                                WHERE {\
                                  :x ?p () .\
                                }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#list0");
                                    test.done();
                });
            });
        });
    });
}

exports.testList2 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX : <http://example.org/ns#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> INSERT DATA { :x :list0 () . :x :list1 ("1"^^xsd:integer) . :x :list2 ("11"^^xsd:integer "22"^^xsd:integer) . :x :list3 ("111"^^xsd:integer "222"^^xsd:integer "333"^^xsd:integer) .}', function(success, result){

                engine.execute('PREFIX : <http://example.org/ns#>\
                                SELECT ?p\
                                WHERE {\
                                  :x ?p (1) .\
                                }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#list1");
                                    test.done();
                });
            });
        });
    });
}

exports.testList3 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX : <http://example.org/ns#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> INSERT DATA { :x :list0 () . :x :list1 ("1"^^xsd:integer) . :x :list2 ("11"^^xsd:integer "22"^^xsd:integer) . :x :list3 ("111"^^xsd:integer "222"^^xsd:integer "333"^^xsd:integer) .}', function(success, result){

                engine.execute('PREFIX : <http://example.org/ns#>\
                                SELECT ?p ?v\
                                WHERE {\
                                  :x ?p (?v) .\
                                }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#list1");
                                    test.ok(results[0].v.value === "1");
                                    test.done();
                });
            });
        });
    });
}

exports.testList4 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX : <http://example.org/ns#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> INSERT DATA { :x :list0 () . :x :list1 ("1"^^xsd:integer) . :x :list2 ("11"^^xsd:integer "22"^^xsd:integer) . :x :list3 ("111"^^xsd:integer "222"^^xsd:integer "333"^^xsd:integer) .}', function(success, result){

                engine.execute('PREFIX : <http://example.org/ns#>\
                                SELECT ?p ?v ?w\
                                WHERE {\
                                  :x ?p (?v ?w) .\
                                }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#list2");
                                    test.ok(results[0].v.value === "11");
                                    test.ok(results[0].w.value === "22");
                                    test.done();
                });
            });
        });
    });
}

exports.testQuotes1 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> INSERT DATA { :x1 :p1 "x" . :x2 :p2 """x \
y""" . :x3 :p3 """x \
y"""^^:someType .}';
            engine.execute(query, function(success, result){
                engine.execute("PREFIX : <http://example.org/ns#>\
                                SELECT ?x\
                                WHERE {\
                                  ?x ?p '''x''' .}", function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].x.value === "http://example.org/ns#x1");
                                    test.done();
                });
            });
        });
    });
}

exports.testQuotes2 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> INSERT DATA { :x1 :p1 "x" . :x2 :p2 """x \
y""" . :x3 :p3 """x \
y"""^^:someType .}';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX : <http://example.org/ns#>\
                                SELECT ?x\
                                WHERE {\
                                  ?x ?p """x""" .}', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].x.value === "http://example.org/ns#x1");
                                    test.done();
                });
            });
        });
    });
}

exports.testQuotes3 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> INSERT DATA { :x1 :p1 "x" . :x2 :p2 """x \
y""" . :x3 :p3 """x \
y"""^^:someType .}';
            engine.execute(query, function(success, result){
                engine.execute("PREFIX : <http://example.org/ns#>\
                                SELECT ?x\
                                WHERE {\
                                  ?x ?p '''x \
y''' .}", function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].x.value === "http://example.org/ns#x2");
                                    test.done();
                });
            });
        });
    });
}

exports.testQuotes4 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> INSERT DATA { :x1 :p1 "x" . :x2 :p2 """x \
y""" . :x3 :p3 """x \
y"""^^:someType .}';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX : <http://example.org/ns#>\
                                SELECT ?x\
                                WHERE {\
                                  ?x ?p """x \
y"""^^:someType .}', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].x.value === "http://example.org/ns#x3");
                                    test.done();
                });
            });
        });
    });
}


exports.testTerm1 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C . :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p true . }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#p1");
                                    test.done();
                });
            });
        });
    });
}


exports.testTerm2 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C . :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p false . }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#p2");
                                    test.done();
                });
            });
        });
    });
}

exports.testTerm3 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C .\
                           :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x a ?C . }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].C.value === "http://example.org/ns#C");
                                    test.done();
                });
            });
        });
    });
}

exports.testTerm4 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C .\
                           :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p 123.0 }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#n1");
                                    test.done();
                });
            });
        });
    });
}

exports.testTerm5 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C .\
                           :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p 123.0. }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#n1");
                                    test.done();
                });
            });
        });
    });
}

exports.testTerm6 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C .\
                           :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p 456. }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#n2");
                                    test.done();
                });
            });
        });
    });
}

exports.testTerm7 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C .\
                           :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p 456. . }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#n2");
                                    test.done();
                });
            });
        });
    });
}


exports.testTerm8 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C .\
                           :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p +5 . }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#n3");
                                    test.done();
                });
            });
        });
    });
}

exports.testTerm9 = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            var query = 'PREFIX : <http://example.org/ns#> \
                         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \
                         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                         INSERT DATA {\
                           :x :p1 "true"^^xsd:boolean .\
                           :x :p2 "false"^^xsd:boolean .\
                           :x rdf:type :C .\
                           :x :n1  "123.0"^^xsd:decimal .\
                           :x :n2  "456."^^xsd:decimal .\
                           :x :n3 "+5"^^xsd:integer .\
                           :x :n4 "-18"^^xsd:integer . }';
            engine.execute(query, function(success, result){
                engine.execute('PREFIX :     <http://example.org/ns#>\
                                PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>\
                                SELECT * { :x ?p -18 . }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 1);
                                    test.ok(results[0].p.value === "http://example.org/ns#n4");
                                    test.done();
                });
            });
        });
    });
}


exports.testBaseBGPNoMatch = function(test) {
    new Lexicon.Lexicon(function(lexicon){
        new QuadBackend.QuadBackend({treeOrder: 2}, function(backend){
            var engine = new QueryEngine.QueryEngine({backend: backend,
                                                      lexicon: lexicon});      
            engine.execute('PREFIX : <http://example.org/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> INSERT DATA { :john a foaf:Person ; foaf:name "John Smith" }', function(success, result){
                engine.execute('PREFIX : <http://example.org/>\
                                PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
                                SELECT ?x\
                                WHERE {\
                                  ?x foaf:name "John Smith" ;\
                                       a foaf:Womble .\
                                }', function(success, results){
                                    test.ok(success === true);
                                    test.ok(results.length === 0);
                                    test.done();
                });
            });
        });
    });
}
