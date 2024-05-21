var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAndSaveUserData, getOrRefreshUserData } from '../../application/services/osuUserServices.js';
export const postUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const data = yield fetchAndSaveUserData(userId);
    res.status(200).json(data);
});
export const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const data = yield getOrRefreshUserData(userId);
    res.status(200).json(data);
});
