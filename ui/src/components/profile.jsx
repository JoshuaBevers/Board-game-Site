import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function profile() {
  const getLocalData = (localKey) => {
    const itemStr = localStorage.getItem(localKey);
    if (!itemStr) {
      return '';
    }
    const item = JSON.parse(itemStr);
    const currentDate = new Date();
    if (currentDate.getTime() > item.expiry) {
      localStorage.removeItem(localKey);
      return '';
    }
    return item.localValue;
  };
  return <h1>hello</h1>;
}

export default profile;
