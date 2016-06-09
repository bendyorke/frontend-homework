(ns invoicer.core
  (:require [compojure.core :refer [defroutes context GET POST]]
            [compojure.route :refer [resources]]
            [org.httpkit.server :refer [run-server]]
            [clojure.java.io :as io]
            [ring.middleware.format :refer [wrap-restful-format]]
            [ring.util.response :refer [response]]
            [invoicer.db :refer [conn db]]
            [invoicer.queries :as q]
            [invoicer.transactions :as t]
            [datomic.api :as d])
  (:gen-class))

(def dev? (= "development" (get (System/getenv) "CLJ_ENV" "development")))

(defroutes routes
  (context "/api" []
    (GET "/invoices" []
      (response (q/all-invoices (db))))
    (POST "/invoices" {params :params}
      (let [inv (update-in params [:invoice/line-items] (partial map #(update % :line-item/qty float)))
            tx @(t/create-invoice (conn) inv)
            id (-> tx :tempids vals first)]
        (response (d/pull (:db-after tx) '[*] id)))))
  (resources "/")
  (GET "*" []
    (let [file (str "public/index" (if dev? ".dev" "") ".html")]
      (io/resource file))))

(def handler
  (-> routes
      (wrap-restful-format :formats [:json-kw])))

(defn -main []
  (run-server handler {:port 5888}))
