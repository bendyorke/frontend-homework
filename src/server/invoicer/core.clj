(ns invoicer.core
  (:require [compojure.core :refer [defroutes context GET POST]]
            [compojure.route :refer [resources]]
            [clojure.java.io :as io]
            [ring.middleware.format :refer [wrap-restful-format]]
            [ring.util.response :refer [response]]
            [invoicer.db :refer [conn db]]
            [invoicer.queries :as q]
            [invoicer.transactions :as t]
            [datomic.api :as d]))

(def dev? (= "development" (get (System/getenv) "CLJ_ENV" "development")))

(defroutes routes
  (GET "/" []
    (let [file (str "public/index" (if dev? ".dev" "") ".html")]
      (io/resource file)))
  (context "/api" []
    (GET "/invoices" []
      (response (q/all-invoices (db))))
    (POST "/invoices" {params :params}
      (let [tx @(t/create-invoice (conn) params)
            id (-> tx :tempids vals first)]
        (response (d/pull (:db-after tx) '[*] id)))))
  (resources "/"))

(def handler
  (-> routes
      (wrap-restful-format :formats [:json-kw])))