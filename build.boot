(set-env!
 :source-paths #{"src/server"}
 :resource-paths #{"resources"}
 :dependencies '[[org.clojure/clojure "1.8.0"]
                 [http-kit "2.1.18"]
                 [compojure "1.5.0"]
                 [pandeiro/boot-http "0.7.3"]
                 [com.datomic/datomic-free "0.9.5372"]
                 [ring/ring-core "1.4.0"]
                 [ring-middleware-format "0.7.0"]
                 ])

(require '[pandeiro.boot-http :refer [serve]])

(task-options!
 pom {:project 'invoicer
      :version "1.0.0"}
 aot {:namespace '#{invoicer.core}}
 jar {:main 'invoicer.core
      :manifest {"Description" "Simple invoice application"
                 "Url" "https://github.com/bendyorke/invoicer"}}
 target {:dir #{"target"}})

(deftask dev [p port VAL int "Port to run server on, defaults to 5888"]
  (println *clojure-version*)
  (comp (serve :handler 'invoicer.core/handler
               :reload  true
               :port    (or port 5888))
        (watch)
        (repl :server true)))

(deftask build []
  (comp (aot) (pom) (uber) (jar) (target)))
