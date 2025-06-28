using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interface;
using api.Models;
using api.Data; 
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        
        public async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where( u => u.AppUserId == user.Id).Select(stock => new Stock{
                Id = stock.StockId,
                Symbol = stock.Stock.Symbol,
                CompanyName = stock.Stock.CompanyName,
                Purchase = stock.Stock.Purchase,
                LastDiv = stock.Stock.LastDiv,
                Industry = stock.Stock.Industry,
                MarketCap = stock.Stock.MarketCap,

            }).ToListAsync();
            

        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<bool> DeletePortfolio(AppUser user, string symbol)
        {
            var portfolioItem = await _context.Portfolios
                .Include(p => p.Stock)
                .FirstOrDefaultAsync(p => p.AppUserId == user.Id && p.Stock.Symbol.ToLower() == symbol.ToLower());

            if (portfolioItem == null) return false;

            _context.Portfolios.Remove(portfolioItem);
            await _context.SaveChangesAsync();
            return true;
        }
        
    }
}