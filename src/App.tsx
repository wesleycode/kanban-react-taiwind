import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyRouter } from './infrastructure/router/my-router/MyRouter';
import { BrowserRouter } from "react-router";
import { SectionProvider } from './application/providers/section-provider';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SectionProvider>
        <BrowserRouter>
          <MyRouter />
        </BrowserRouter>
      </SectionProvider>
    </QueryClientProvider>
  </StrictMode>,
)