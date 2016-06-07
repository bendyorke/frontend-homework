(ns invoicer.db
  (:require [datomic.api :as d]))

(def uri "datomic:mem://invoicer")
(def schema (-> "src/server/schema.edn" slurp read-string))

(defn load-schema []
  @(d/transact (d/connect uri) (:schema schema))
  @(d/transact (d/connect uri) (:seed schema)))

(defn conn []
  (and (d/create-database uri) (load-schema))
  (d/connect uri))

(defn db
  ([] (db (conn)))
  ([conn] (d/db conn)))

(defn destroy []
  (d/delete-database uri))
