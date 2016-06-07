(ns invoicer.queries
  (:require [datomic.api :as d]))

(defn all-invoices [db]
  (d/q
   '[:find [(pull ?e [*]) ...]
     :where [?e :invoice/number]]
   db))
