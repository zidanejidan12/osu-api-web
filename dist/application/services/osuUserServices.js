var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from '../../infrastructure/osuApi.js';
import { saveUserData, getUserData } from '../../infrastructure/repositories/osuUserRepositories.js';
export const fetchAndSaveUserData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(userId);
    yield saveUserData(userId, data);
    return data;
});
export const getOrRefreshUserData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserData(userId);
    if (user) {
        const lastUpdated = new Date(user.updatedAt);
        const now = new Date();
        const hoursDiff = Math.abs(now.getTime() - lastUpdated.getTime()) / 36e5;
        if (hoursDiff > 24) {
            return yield fetchAndSaveUserData(userId);
        }
        return user.data;
    }
    return yield fetchAndSaveUserData(userId);
});
