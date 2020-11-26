import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "./../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({title, items}) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(cartItem => (
          <CollectionItem key={cartItem.id} item={cartItem} />
        ))}
    </div>
  </div>
)

export default withRouter(CollectionPreview)