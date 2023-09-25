import React, { useState } from "react";
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export type ConditionType = {
  fieldName: string;
  operator: WhereFilterOp;
  compareValue: any;
};

export const useFireStore = (
  collectionName: string,
  condition?: ConditionType
) => {
  const [document, setDocument] = useState<any>([]);
  React.useEffect(() => {
    let q = query(collection(db, collectionName), orderBy("createdAt"));
    if (condition) {
      q = query(
        collection(db, collectionName),
        orderBy("createdAt"),
        condition &&
          where(condition.fieldName, condition.operator, condition.compareValue)
      );
      if (!condition.compareValue || !condition.compareValue.length) {
        q = query(collection(db, collectionName), orderBy("createdAt"));
        return;
      }
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents: any = [];
      querySnapshot?.forEach((doc) => [
        documents.push({
          ...doc.data(),
          id: doc.id,
        }),
      ]);
      if (!documents) return;
      setDocument(documents);
    });

    return unsubscribe;
  }, [collectionName, condition]);
  return document;
};
