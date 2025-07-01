using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using api.Models;
using api.Interface;
using api.Data;
using api.DTOs.Stock;
using api.Mappers;
using api.DTOs.Comment;
using api.DTOs.Stock;



namespace api.Controllers
{
    [ApiController]
    [Route("api/Portfolio")]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFMPService _fmpService;

        public PortfolioController(UserManager<AppUser> userManager,IStockRepository stockRepo,IPortfolioRepository portfolioRepo,IFMPService fmpService)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo; 
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            return Ok(userPortfolio);
        }
        
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);
            var stock = await _stockRepo.GetBySymbolAsync(symbol);

             if(stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if(stock == null)
                    {return BadRequest("Stock does not Exists");}
                else{
                    await _stockRepo.CreateAsync(stock);
                }
            }


            if(stock == null) return BadRequest("Stock not found");

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            if(userPortfolio.Any(x => x.Symbol.ToLower() == symbol.ToLower())) return BadRequest("Stock already in portfolio");

            var portfolioModel = new Portfolio
            {
                StockId = stock.Id,
                AppUserId = appUser.Id, 
            };

            await _portfolioRepo.CreateAsync(portfolioModel);

            if(portfolioModel == null) return BadRequest("Failed to add stock to portfolio");
            else{return StatusCode(204);}
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            var userName = User.GetUserName();
            var appUser = await _userManager.FindByNameAsync(userName);

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            var filteredStock = userPortfolio.Where(s => s.Symbol.ToLower() == symbol.ToLower()).ToList();

            if (filteredStock.Count() == 1)
            {
                await _portfolioRepo.DeletePortfolio(appUser, symbol);
            }
            else
            {
                return BadRequest("Stock not in your portfolio");
            }

            return Ok();
        }
    }
}