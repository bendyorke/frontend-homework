(ns invoicer.transactions
  (:require [datomic.api :as d]))

(defn create-invoice [conn invoice]
  (d/transact conn [(assoc invoice :db/id #db/id[:db.part/user -1])
                    [:number #db/id[:db.part/user -1]]]))
