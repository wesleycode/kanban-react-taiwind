import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyRouter } from './infrastructure/router/my-router/MyRouter';
import { BrowserRouter } from "react-router";
import { SectionProvider } from './application/providers/section-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SectionProvider>
      <BrowserRouter>
        <MyRouter />
      </BrowserRouter>
    </SectionProvider>
  </StrictMode>,
)