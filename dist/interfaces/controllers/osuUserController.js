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
import { BadRequestError } from '../../application/errors/BadRequestError.js';
export const postUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new BadRequestError('Missing userId parameter');
        }
        const data = yield fetchAndSaveUserData(userId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error(`Error in postUserData for user ${req.params.userId}:`, error);
        if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        }
        else if (error instanceof Error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred' });
        }
    }
});
export const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new BadRequestError('Missing userId parameter');
        }
        const data = yield getOrRefreshUserData(userId);
        res.status(200).json(data);
    }
    catch (error) {
        console.error(`Error in getUserData for user ${req.params.userId}:`, error);
        if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        }
        else if (error instanceof Error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred' });
        }
    }
});
