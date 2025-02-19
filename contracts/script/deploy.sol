// scripts/deploy.sol
pragma solidity ^0.8.18;
import { ResearchPaperRegistry } from "../src/ResearchPaper.sol";

contract DeployScript {
    function run() external {
        new ResearchPaperRegistry();
    }
}
