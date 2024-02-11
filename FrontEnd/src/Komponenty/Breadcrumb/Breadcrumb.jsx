import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBreadcrumb } from '../../Kontext/BreadcrumbContext';
import './Breadcrumb.css'
const Breadcrumb = (props) => {
  
  const { addBreadcrumb, breadcrumbs, clearBreadcrumbs } = useBreadcrumb();

  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);

    clearBreadcrumbs(); 
    let fullPath = '';
    pathParts.forEach((part, index) => {
      fullPath += `/${part}`;
      addBreadcrumb(fullPath);
    });
  }, [location]);

  const handleBreadcrumbClick = (index) => {
    clearBreadcrumbs(index + 1);
  };

  return (
    <div>
      <Link to='/' id='link'>Domov</Link>
      <span>{' > '}</span>
      {breadcrumbs.map((path, index) => (
        <span key={index}>
          <Link to={path} id='link' onClick={() => handleBreadcrumbClick(index)}>
            {path.split('/').pop()} 
          </Link>
          {index < breadcrumbs.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
